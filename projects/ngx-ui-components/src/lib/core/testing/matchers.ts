/**
 * Global custom matchers for Jasmine.
 */
const matchers = {

  toHaveCssClass(): jasmine.CustomMatcher {
    return {
      compare: check(false),
      negativeCompare: check(true)
    };

    function check(isNot: boolean) {
      return (actual: HTMLElement, className: string): jasmine.CustomMatcherResult => ({
        pass: actual.classList.contains(className) === !isNot,
        message: `Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}to contain the CSS class "${className}"`
      })
    }
  }

};

export default matchers;
