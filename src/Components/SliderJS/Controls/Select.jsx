export default function Select({move, data, config}) {
	return <div className="select" style={{ position: "absolute", display: "flex" }}>
		{data.map((slide, index) => <div key={index + 1} onClick={(e) => {move(index)}} className={config.index === (config.xScroll ? index : index +1) ? "selection selected" : "selection "}>
			{config.xScroll ? <img src={slide.images[ 0 ].url} alt="" /> : index + 1}
		</div>)}
	</div>
}