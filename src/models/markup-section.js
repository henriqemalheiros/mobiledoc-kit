import Markerable from './_markerable';
import { normalizeTagName } from '../utils/dom-utils';
import { contains } from '../utils/array-utils';
import { MARKUP_SECTION_TYPE } from './types';

// valid values of `tagName` for a MarkupSection
export const VALID_MARKUP_SECTION_TAGNAMES = [
  'aside',
  'blockquote',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
].map(normalizeTagName);

// valid element names for a MarkupSection. A MarkupSection with a tagName
// not in this will be rendered as a div with a className matching the
// tagName
export const MARKUP_SECTION_ELEMENT_NAMES = [
  'aside',
  'blockquote',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
].map(normalizeTagName);
export const DEFAULT_TAG_NAME = VALID_MARKUP_SECTION_TAGNAMES[8];

const MarkupSection = class MarkupSection extends Markerable {
  constructor (tagName = DEFAULT_TAG_NAME, markers = []) {
    super(MARKUP_SECTION_TYPE, tagName, markers);
    this.isMarkupSection = true;
  }

  isValidTagName (normalizedTagName) {
    return contains(VALID_MARKUP_SECTION_TAGNAMES, normalizedTagName);
  }

  splitAtMarker (marker, offset = 0) {
    let [beforeSection, afterSection] = [
      this.builder.createMarkupSection(this.tagName, []),
      this.builder.createMarkupSection(),
    ];

    return this._redistributeMarkers(beforeSection, afterSection, marker, offset);
  }
};

export default MarkupSection;
