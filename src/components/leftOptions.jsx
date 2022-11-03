import React, { Component } from "react";

class LeftOptions extends Component{

    state = {}

    handleChange = (e) => {
        const { currentTarget: input } = e;
        let options = {...this.props.options};
        options[input.name] = this.updateCBs(options[input.name], input.checked, input.value);
        this.props.onOptionChange(options);
    }

    updateCBs = (inpValue, checked, value) => {
        let inpArr = inpValue ? inpValue.split(",") : [];
        if (checked) inpArr.push(value);
        else {
            let index = inpArr.findIndex(ele => ele === value);
            if (index >= 0) inpArr.splice(index, 1);
        }
        return inpArr.join(",");
    } 

    makeCheckBoxes = (arr, values, name, label) => {
        return (
            <React.Fragment>
                <label className="form-check-label" style={{fontWeight: "bold"}}>{label}</label>
                {arr.map((opt, index) => (
                    <div className="form-check" key={index}>
                        <input type="checkbox" className="form-check-input" name={name} value={opt} checked={values.findIndex(val=> val === opt) >= 0} onChange={this.handleChange} />
                        <label className="form-check-label">{opt}</label>
                    </div>
                ))}
            </React.Fragment>
        )
    }

    render(){
        const { allOptions } = this.props;
        const { ram = "", rom = "" } = this.props.options
        return (
            <React.Fragment>
                <div className="row bg-light">
                    <div className="col-12">
                        {this.makeCheckBoxes(allOptions.ram, ram.split(","), "ram", "Course RAM")}
                    </div>
                    <div className="col-12">
                        {this.makeCheckBoxes(allOptions.rom, rom.split(","), "rom", "Course ROM")}
                    </div>
                </div>
            </React.Fragment>
        );
    }

}
export default LeftOptions