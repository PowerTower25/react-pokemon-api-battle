import "./Card.css";

function Card({attacks, name, hp}) {

    const elementId = `${name}-hp`
    return (
        <>
        <div className="card">
            <div className="card__header">
                <h3 aria-describedby={elementId}>{name}</h3>
                <p id={elementId}>HP{hp}</p>
            </div>
            <div className="card__body">
                <div className="card__body__abilities"></div>
                <div className="card__body__attacks">
                  <h4>Attacks</h4>
                  {attacks && attacks.map((attack, index) => (
                    <div key={index} className="attack">
                      <p><strong>{attack.name}</strong> ({attack.damage})</p>
                      <p>{attack.text}</p>
                      <p>Cost: {attack.cost.join(', ')}</p>
                    </div>
                  ))}
                </div>
            </div>
            <div className="card_footer"></div>
        </div>
        </>
    )
}

export default Card;