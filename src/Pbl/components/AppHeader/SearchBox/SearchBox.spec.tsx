/* eslint-disable camelcase */
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '@pbl/utils/test';
import { DisconnectedAppHeaderSearchBox } from '@pbl/components/AppHeader/SearchBox/SearchBox';

const renderSearchBox = (props = {}, options = {}) =>
  renderWithRouter(
    <DisconnectedAppHeaderSearchBox currentRefinement='' hits={[]} refine={() => {}} {...props} />,
    options
  );

const { ResizeObserver } = window;

describe('AppHeaderSearchBox', () => {
  beforeEach(() => {
    // @ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
  });

  it('does not show autocomplete when no hints', () => {
    renderSearchBox();

    userEvent.click(screen.getByRole('textbox'));

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('does not show autocomplete when on search route', () => {
    const hits = [{ display_name: 'firt hit' }];

    renderSearchBox({ hits }, { route: '/project-search', routePath: '/project-search' });

    userEvent.click(screen.getByRole('textbox'));

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('shows autocomplete when hints exists and on different route', () => {
    const hits = [{ display_name: 'firt hit', objectID: '1' }];

    renderSearchBox({ hits });

    userEvent.click(screen.getByRole('textbox'));

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders max 8 hits', () => {
    const hits = [
      { display_name: 'firt hit', objectID: '1' },
      { display_name: 'second hit', objectID: '2' },
      { display_name: 'third hit', objectID: '3' },
      { display_name: 'fourth hit', objectID: '4' },
      { display_name: 'fifth hit', objectID: '5' },
      { display_name: 'sixth hit', objectID: '6' },
      { display_name: 'seventh hit', objectID: '7' },
      { display_name: 'eight hit', objectID: '8' },
      { display_name: 'ninth hit', objectID: '9' },
      { display_name: 'tenth hit', objectID: '10' },
    ];

    renderSearchBox({ hits });

    userEvent.click(screen.getByRole('textbox'));

    const listItems = within(screen.getByRole('list')).getAllByRole('listitem');

    expect(listItems).toHaveLength(8);
  });

  it('manipulates active class properly on arrow traverse', () => {
    const hits = [
      { display_name: 'firt hit', objectID: '1' },
      { display_name: 'second hit', objectID: '2' },
      { display_name: 'third hit', objectID: '3' },
      { display_name: 'fourth hit', objectID: '4' },
    ];

    renderSearchBox({ hits });

    userEvent.click(screen.getByRole('textbox'));

    const listItems = within(screen.getByRole('list')).getAllByRole('listitem');

    expect(listItems[0].classList.contains('-active')).toBeFalsy();
    expect(listItems[1].classList.contains('-active')).toBeFalsy();
    expect(listItems[2].classList.contains('-active')).toBeFalsy();
    expect(listItems[3].classList.contains('-active')).toBeFalsy();

    userEvent.keyboard('{ArrowDown}');

    expect(listItems[0].classList.contains('-active')).toBeTruthy();
    expect(listItems[1].classList.contains('-active')).toBeFalsy();
    expect(listItems[2].classList.contains('-active')).toBeFalsy();
    expect(listItems[3].classList.contains('-active')).toBeFalsy();

    userEvent.keyboard('{ArrowDown}');

    expect(listItems[0].classList.contains('-active')).toBeFalsy();
    expect(listItems[1].classList.contains('-active')).toBeTruthy();
    expect(listItems[2].classList.contains('-active')).toBeFalsy();
    expect(listItems[3].classList.contains('-active')).toBeFalsy();

    userEvent.keyboard('{ArrowDown}');

    expect(listItems[0].classList.contains('-active')).toBeFalsy();
    expect(listItems[1].classList.contains('-active')).toBeFalsy();
    expect(listItems[2].classList.contains('-active')).toBeTruthy();
    expect(listItems[3].classList.contains('-active')).toBeFalsy();

    userEvent.keyboard('{ArrowDown}');

    expect(listItems[0].classList.contains('-active')).toBeFalsy();
    expect(listItems[1].classList.contains('-active')).toBeFalsy();
    expect(listItems[2].classList.contains('-active')).toBeFalsy();
    expect(listItems[3].classList.contains('-active')).toBeTruthy();

    userEvent.keyboard('{ArrowDown}');

    expect(listItems[0].classList.contains('-active')).toBeTruthy();
    expect(listItems[1].classList.contains('-active')).toBeFalsy();
    expect(listItems[2].classList.contains('-active')).toBeFalsy();
    expect(listItems[3].classList.contains('-active')).toBeFalsy();

    userEvent.keyboard('{ArrowUp}');

    expect(listItems[0].classList.contains('-active')).toBeFalsy();
    expect(listItems[1].classList.contains('-active')).toBeFalsy();
    expect(listItems[2].classList.contains('-active')).toBeFalsy();
    expect(listItems[3].classList.contains('-active')).toBeTruthy();

    userEvent.keyboard('{ArrowUp}');

    expect(listItems[0].classList.contains('-active')).toBeFalsy();
    expect(listItems[1].classList.contains('-active')).toBeFalsy();
    expect(listItems[2].classList.contains('-active')).toBeTruthy();
    expect(listItems[3].classList.contains('-active')).toBeFalsy();
  });

  it('calls refine with proper value on enter', () => {
    const refineSpy = jest.fn();

    const hits = [
      { display_name: 'firt hit', objectID: '1' },
      { display_name: 'second hit', objectID: '2' },
      { display_name: 'third hit', objectID: '3' },
      { display_name: 'fourth hit', objectID: '4' },
    ];

    renderSearchBox({ hits, refine: refineSpy });

    userEvent.click(screen.getByRole('textbox'));
    userEvent.keyboard('{ArrowDown}');
    userEvent.keyboard('{ArrowDown}');
    userEvent.keyboard('{Enter}');

    expect(refineSpy).toHaveBeenCalledTimes(1);
    expect(refineSpy).toHaveBeenCalledWith('second hit');
  });

  it('calls refine after 4 letters typed', async () => {
    const refineSpy = jest.fn();

    renderSearchBox({ hits: [], refine: refineSpy });
    const searchBox = screen.getByRole('textbox');

    userEvent.paste(searchBox, 'a');
    expect(refineSpy).toHaveBeenCalledTimes(0);

    userEvent.paste(searchBox, 'b');
    expect(refineSpy).toHaveBeenCalledTimes(0);

    userEvent.paste(searchBox, 'c');
    expect(refineSpy).toHaveBeenCalledTimes(0);

    userEvent.paste(searchBox, 'd');

    await waitFor(() => expect(refineSpy).toHaveBeenCalledTimes(1));
    expect(refineSpy).toHaveBeenCalledWith('abcd');
  });

  it('calls refine with proper value on mouseclick', () => {
    const refineSpy = jest.fn();

    const hits = [
      { display_name: 'firt hit', objectID: '1' },
      { display_name: 'second hit', objectID: '2' },
      { display_name: 'third hit', objectID: '3' },
      { display_name: 'fourth hit', objectID: '4' },
    ];

    renderSearchBox({ hits, refine: refineSpy });

    userEvent.click(screen.getByRole('textbox'));

    const listItems = within(screen.getByRole('list')).getAllByRole('listitem');

    userEvent.click(listItems[3]);

    expect(refineSpy).toHaveBeenCalledTimes(1);
    expect(refineSpy).toHaveBeenCalledWith('fourth hit');
  });
});
