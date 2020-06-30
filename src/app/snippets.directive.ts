import { Directive, Input } from '@angular/core';

interface Snippet {
  id?: number;
  name: string;
  content: string;
}

@Directive({
  selector: '[appSnippets]',
  host: {
    '(input)': 'onChange($event)'
  }
})
export class SnippetsDirective {
  @Input('appSnippets') snippetsList: Array<Snippet>;
  private snippetRegex: RegExp;

  constructor() {
    this.snippetRegex = /(?:^|\W)(\w+)(?!\w)`/g;  // Match on given string with a following `
  }

  onChange($event) {
    if ($event.target.value.match(this.snippetRegex) !== null) {
      $event.target.value = this._getValue($event.target.value);
    }
  }

  private _getValue(value: string) {
    let snippets = value.match(this.snippetRegex);
    snippets.forEach(snippet => {
      value = value.replace(snippet, this._getSnippetContent(snippet));
    });

    return value;
  }

  private _getSnippetContent(snippet) {
    this.snippetsList.forEach(s => {
      if (s.name.toLowerCase() === snippet.trim().replace('`', '').toLowerCase()) {
        snippet = s.content;
      }
    });

    return snippet;
  }
}
