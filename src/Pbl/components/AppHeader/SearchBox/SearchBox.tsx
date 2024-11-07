import { connectAutoComplete, AutocompleteProvided } from 'react-instantsearch-core';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  ChangeEvent,
  KeyboardEvent,
  RefObject,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';

import debounce from '@shared/utils/debounce';
import { KeyboardCodes } from '@shared/resources/enums';
import { ReactComponent as Search } from '@shared/svg/search.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { TextInput } from '@shared/components/TextInput/TextInput';
import { IconButton } from '@shared/components/IconButton/IconButton';

import AutoComplete from './AutoComplete/AutoComplete';

import './Searchbox.sass';

function AppHeaderSearchBox({
  hits,
  currentRefinement,
  refine: algoliaRefine,
}: AutocompleteProvided) {
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);
  const [hoveredName, setHoveredName] = useState('');
  const [activeHintIndex, setActiveHintIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation();
  const history = useHistory();
  const inputRef = useRef() as RefObject<HTMLInputElement>;
  const hintsExisting = hits.length > 0;
  const notOnProjectSearchRoute = !history.location.pathname.includes('project-search');
  const shouldShowTypeMore = inputValue.length > 0 && inputValue.length < 4;
  const shouldShowAutoComplete =
    autocompleteVisible && hintsExisting && notOnProjectSearchRoute && !shouldShowTypeMore;
  const lastItemIndex = hits.length <= 8 ? hits.length - 1 : 7;

  const debouncedRefine = useCallback(debounce(algoliaRefine, 300), []);
  const toggleAutoComplete = () =>
    setAutocompleteVisible((autoCompleteVisible) => !autoCompleteVisible);

  useEffect(() => {
    if (notOnProjectSearchRoute) {
      setActiveHintIndex(-1);
      setInputValue('');
      debouncedRefine('');
    }
  }, [history.location.pathname]);

  const refine = (val: string): void => {
    algoliaRefine(val);
    setInputValue(val);
  };

  const goToSearch = () => {
    history.push('/project-search');
  };

  const handleFocus = () => {
    setActiveHintIndex(-1);
    toggleAutoComplete();
    inputRef.current?.select();
  };

  const handleBlur = () => {
    toggleAutoComplete();
    setActiveHintIndex(-1);

    if (hoveredName) {
      refine(hoveredName);
      notOnProjectSearchRoute && goToSearch();
    }

    setHoveredName('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;

    setInputValue(target.value);
    setActiveHintIndex(-1);

    if (!target.value.length || target.value.length > 3) {
      debouncedRefine(target.value);
    }
  };

  const handleEnterClick = () => {
    const refineVal = hits[activeHintIndex]?.display_name;
    const hasValueToSearch = refineVal || currentRefinement;

    if (hintsExisting) {
      refineVal && refine(refineVal);
    }

    if (notOnProjectSearchRoute && hasValueToSearch) {
      goToSearch();
    }

    inputRef.current?.blur();
  };

  const handleArrowDownClick = (event: KeyboardEvent) => {
    event.preventDefault();
    const lastItemActive = lastItemIndex === activeHintIndex;
    const newIndex = lastItemActive ? 0 : activeHintIndex + 1;

    setActiveHintIndex(newIndex);
  };

  const handleArrowUpClick = (event: KeyboardEvent) => {
    event.preventDefault();
    const firstItemActive = activeHintIndex === 0;
    const newIndex = firstItemActive ? lastItemIndex : activeHintIndex - 1;

    setActiveHintIndex(newIndex);
  };

  const handleEscapeClick = () => {
    setHoveredName('');
    setTimeout(() => inputRef.current?.blur(), 0);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const handler = {
      [KeyboardCodes.ENTER]: handleEnterClick,
      [KeyboardCodes.ESCAPE]: handleEscapeClick,
      [KeyboardCodes.ARROW_DOWN]: handleArrowDownClick,
      [KeyboardCodes.ARROW_UP]: handleArrowUpClick,
    }[event.key];

    handler && handler(event);
  };

  return (
    <div className='relative flex items-center'>
      <Tooltip disabled={!shouldShowTypeMore} message={t('appHeader.typeMore')} open={true}>
        <TextInput
          ref={inputRef}
          inputWrapperClassnames='!rounded-r-none'
          placeholder={t('common.placeholders.search')}
          size='sm'
          value={inputValue}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
      </Tooltip>
      <IconButton
        Icon={Search}
        className='rounded-l-none'
        size='md'
        variant='primary'
        onClick={goToSearch}
      />
      {shouldShowAutoComplete && (
        <AutoComplete
          activeHintIndex={activeHintIndex}
          hits={hits}
          setHoveredName={setHoveredName}
        />
      )}
    </div>
  );
}

export const DisconnectedAppHeaderSearchBox = AppHeaderSearchBox;

export default connectAutoComplete(AppHeaderSearchBox);
