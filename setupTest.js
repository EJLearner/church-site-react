import * as matchers from '@testing-library/jest-dom/matchers';
import {expect, vi} from 'vitest';

const scrollTo = vi.fn();

vi.stubGlobal('scrollTo', scrollTo);

expect.extend(matchers);
