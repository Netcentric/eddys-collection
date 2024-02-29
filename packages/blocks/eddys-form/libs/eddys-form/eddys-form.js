import createField from './eddys-form-fields.js';
import { sampleRUM } from '../../scripts/aem.js';

export class EddysForm {
  payload = {};
  currentStep = 1;
  maxSteps = 1;

  constructor(block) {
    this.formLink = block.querySelector('a[href$=".json"]');
    if (!this.formLink) return;

    this.block = block;
  }

  async init() {
    this.form = await this.createForm(this.formLink.href);

    this.addEventListeners();
  }

  addEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const valid = this.form.checkValidity();
      if (valid) {
        this.handleSubmit();
      } else {
        const firstInvalidEl = this.form.querySelector(':invalid:not(fieldset)');
        if (firstInvalidEl) {
          firstInvalidEl.focus();
          firstInvalidEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  async handleSubmit() {
    if (this.form.getAttribute('data-submitting') === 'true') return;
  
    const submit = this.form.querySelector('button[type="submit"]');
    try {
      this.form.setAttribute('data-submitting', 'true');
      submit.disabled = true;
  
      // create payload
      this.generatePayload();
  
      // generate next step
      if (this.currentStep < this.maxSteps) {
        this.currentStep += 1;
  
        this.form.style.animationName = 'fade-out';
        this.form.style.animationDuration = '600ms';
        this.form.style.animationDelay = '400ms';
  
        return;
      }
  
      const response = await fetch(this.form.dataset.action, {
        method: 'POST',
        body: JSON.stringify({ data: this.payload }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        sampleRUM('form:submit', { source: '.form', target: this.form.dataset.action });
        if (this.form.dataset.confirmation) {
          window.location.href = this.form.dataset.confirmation;
        }
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (e) {
      this.handleSubmitError(e);
    } finally {
      this.form.setAttribute('data-submitting', 'false');
    }
  }
  
  handleSubmitError(error) {
    // eslint-disable-next-line no-console
    console.error(error);
    this.form.querySelector('button[type="submit"]').disabled = false;
    sampleRUM('form:error', { source: '.form', target: error.stack || error.message || 'unknown error' });
  }

  generatePayload() {
    [...this.form.elements].forEach((field) => {
      if (field.name && field.type !== 'submit' && field.type !== 'fieldset' && !field.disabled) {
        if (field.type === 'radio') {
          if (field.checked) this.payload[field.name] = field.value;
        } else if (field.type === 'checkbox') {
          if (field.checked) this.payload[field.name] = this.payload[field.name] ? `${this.payload[field.name]},${field.value}` : field.value;
        } else {
          this.payload[field.name] = field.value;
        }
      }
    });
  }

  async createForm(formHref) {
    const { pathname } = new URL(formHref);
    const resp = await fetch(pathname);
    const json = await resp.json();
  
    const form = document.createElement('form');
    // eslint-disable-next-line prefer-destructuring
    form.dataset.action = pathname.split('.json')[0];
  
    this.fields = await Promise.all(json.data.map((fd) => createField(fd, form)));
  
    form.addEventListener('webkitAnimationEnd', (a) => {
      if (a.animationName === 'fade-in') {
        return;
      }
  
      form.style.animationName = 'fade-in';
      form.style.animationDelay = '';
  
      form.replaceChildren();
      this.generateFormfields(form);
  
      form.setAttribute('data-submitting', 'false');
      form.querySelector('button[type="submit"]').disabled = false;
    });
  
    this.generateFormfields(form);
  
    return form;
  }

  generateFormfields(form) {
    this.fields.forEach((field) => {
      let step = field?.dataset.step;
      if (!step) {
        return;
      }
      step = +step;
  
      if (step === this.currentStep || step === -1) {
        if (field.dataset.submitLabel) {
          const button = field.querySelector('button');
          if (this.currentStep < this.maxSteps) {
            button.textContent = field.dataset.submitStepLabel;
          } else {
            button.textContent = field.dataset.submitLabel;
          }
        }
  
        form.append(field);
      } else if (step > this.maxSteps) {
        this.maxSteps = step;
      }
    });
  
    // group fields into fieldsets
    const fieldsets = form.querySelectorAll('fieldset');
    fieldsets.forEach((fieldset) => {
      form.querySelectorAll(`[data-fieldset="${fieldset.name}"`).forEach((field) => {
        fieldset.append(field);
      });
    });
  
    this.block.replaceChildren(form);
  }
}

export async function defaultDecorate(block, ClassObj) {
  block.classList.add('eddys-form');
  const eddysForm = ClassObj ? new ClassObj(block): new EddysForm(block);
  await eddysForm.init();
}
