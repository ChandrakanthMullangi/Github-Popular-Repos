import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeLanguageFilterId: languageFiltersData[0].id,
    repositoriesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageFilterId} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`

    const response = await fetch(apiUrl)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        name: eachRepository.name,
        issuesCount: eachRepository.issues_count,
        forksCount: eachRepository.forks_count,
        starsCount: eachRepository.stars_count,
        avatarUrl: eachRepository.avatar_url,
      }))

      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  setActiveLanguageFilterId = filterId => {
    this.setState({activeLanguageFilterId: filterId}, this.getRepositories)
  }

  renderLanguageFilterItem = () => {
    const {activeLanguageFilterId} = this.state

    return (
      <ul className="language-filters-list">
        {languageFiltersData.map(eachLanguageFilter => (
          <LanguageFilterItem
            key={eachLanguageFilter.id}
            isActive={activeLanguageFilterId === eachLanguageFilter.id}
            languageFilterDetails={eachLanguageFilter}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="repository-item">
        {repositoriesData.map(eachRepository => (
          <RepositoryItem
            key={eachRepository.id}
            repositoryDetails={eachRepository}
          />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading"> Something Went Wrong </h1>
    </div>
  )

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading"> Popular </h1>
        {this.renderLanguageFilterItem()}
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
