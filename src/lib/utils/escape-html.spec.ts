import { escapeHtml } from './escape-html';

describe('escapeHtml', () => {
  it('should be escape html special chars', () => {
    expect(escapeHtml('<htmltag/>')).toBe('&lt;htmltag/&gt;');
    expect(escapeHtml('My\'s <b>evil</b> "test" code\'s here')).toBe(
      `My&#039;s &lt;b&gt;evil&lt;/b&gt; &quot;test&quot; code&#039;s here`,
    );
  });
});
