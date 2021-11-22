const Loader = () => {
    return(
        <div className="take-board">
        <div className="snapper"></div>
        <div className="plate">
          <div className="counter">
            <span className="text">Loading..</span>
            <span className="value">0%</span>
          </div>
        </div>
      </div>
    )
}

export default Loader;