function Card({name}) {
    return (
        <>
        <div className="card">
            <div className="card__header"><h3>{name}</h3></div>
            <div className="card__body">
            </div>
            <div className="card_footer"></div>
        </div>
        </>
    )
}

export default Card;