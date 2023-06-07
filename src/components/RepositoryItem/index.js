// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    avatarUrl,
    starsCount,
    forksCount,
    issuesCount,
  } = repositoryDetails

  return (
    <li className="repository">
      <img src={avatarUrl} alt={name} className="repository-image" />
      <h1 className="repository-heading"> {name} </h1>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="count"> {starsCount} </p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="count"> {forksCount} </p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p className="count"> {issuesCount} </p>
      </div>
    </li>
  )
}

export default RepositoryItem
