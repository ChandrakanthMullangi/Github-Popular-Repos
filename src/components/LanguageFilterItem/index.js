// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {languageFilterDetails, isActive, setActiveLanguageFilterId} = props
  const {id, language} = languageFilterDetails

  const buttonClass = isActive
    ? 'language-filter-button active'
    : 'language-filter-button inactive'

  const onClickLanguageFilter = () => {
    setActiveLanguageFilterId(id)
  }

  return (
    <li>
      <button
        type="button"
        className={buttonClass}
        onClick={onClickLanguageFilter}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
