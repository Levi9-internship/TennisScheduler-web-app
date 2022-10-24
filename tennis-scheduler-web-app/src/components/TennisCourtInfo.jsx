import "../styles/courts.css";


function TennisCourtInfo({ image, name, surfaceType, description }) {
  return (
    <div className="courtItem">
      <div className="courtImage" style={{ backgroundImage: `url(${image})` }}>
        {" "}
      </div>
      <div className="courtInfo">
        <h1> {name} </h1>
        <p> {description} </p>
        <p> {surfaceType} </p>
      </div>
      <button className="addTimeslotBtn">Add timeslot</button>
    </div>
  );
}

export default TennisCourtInfo;
