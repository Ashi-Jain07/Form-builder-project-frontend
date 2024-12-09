function EachComprehensionRender(props) {
    return (
        <>
            <p className="text-xl mt-5 font-bold">Read Passage carefully</p>
            <div className="flex justify-between mt-9">

                <p className="w-1/2 text-sm"> {props.data.para}</p>

                <div className="w-1/2 text-left m-10">
                    <p className="font-bold mb-5">Q. {props.data.question}</p>

                    {
                        props.data.options.map((data, index) => (
                            <div key={data._id || index} className="m-1">
                                <input type="radio" name="option" value={data} />
                                <label>{data}</label>
                            </div>
                        ))
                    }
                </div>

            </div>
        </>
    )
};

export default EachComprehensionRender;