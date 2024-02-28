export const breakpoints = {
  s: 0,
  m: 600,
  l: 900,
  xl: 1200,
  xxl: 1500,
};

export function getBreakPoints() {
  window.eddysBreakpoints = window.eddysBreakpoints || breakpoints;
  window.eddysBreakpoint = window.eddysBreakpoint || {};
  const breakpointsKeys = Object.keys(window.eddysBreakpoints);
  window.eddysBreakpoint = breakpointsKeys.filter(
    (bp) => matchMedia(`(min-width: ${breakpoints[bp]}px)`).matches,
  );
  return window.eddysBreakpoint;
}

export function getBreakPoint() {
  const b = getBreakPoints();
  return b[b.length - 1];
}

export class CustomParamsComponent extends HTMLElement {
  connectedCallback() {
    this.setupParams();
    window.addEventListener('resize', () => {
      // only on width / breakpoint changes
      if (window.eddysBreakpoint !== getBreakPoint()) {
        this.setupParams();
      }
    });
  }

  setupParams() {
    this.setParams();
    Object.keys(this.params).forEach((key) => {
      const value = Array.isArray(this.params[key])
        ? this.params[key].join(' ')
        : this.params[key];
      this.setAttribute(key, value);
    });
  }

  setParams() {
    const mediaParams = {};
    this.params = {
      ...Array.from(this.classList)
        .filter(
          (c) => c !== this.constructor.name.toLowerCase() && c !== 'block',
        )
        .reduce((acc, c) => {
          const values = c.split('-');
          let key = values.shift();
          const breakpoint = getBreakPoint();
          if (breakpoint === key) {
            key = values.shift();
            mediaParams[key] = values.join('-');
            return acc;
          }

          if (breakpoints[key] !== undefined) {
            return acc;
          }

          if (acc[key] && Array.isArray(acc[key])) {
            acc[key].push(values.join('-'));
          } else if (acc[key]) {
            acc[key] = [acc[key], values.join('-')];
          } else {
            acc[key] = values.join('-');
          }
          return acc;
        }, {}),
      ...mediaParams,
    };
  }
}
