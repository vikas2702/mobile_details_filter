import React, { Component } from "react";
import LeftOptions from "./leftOptions";
import queryString from "query-string";

class Brand extends Component{

    state = {
        brandName: this.props.match.params.brand,
    }

    filterParams = (arr, queryParams) => {
        let { ram, rom } = queryParams;
        arr = this.filterParam(arr, "RAM", ram);
        arr = this.filterParam(arr, "ROM", rom);
        return arr;
    }

    filterParam = (arr, name, values) => {
        if(!values) return arr;
        let valuesArr = values.split(",");
        let arr1 = arr.filter((a1) => valuesArr.find((val) => val === a1[name]))
        return arr1;
    }

    makeSearchString = (options) => {
        let { ram, rom } = options;
        let searchStr = "";
        searchStr = this.addToQueryString(searchStr, "ram", ram);
        searchStr = this.addToQueryString(searchStr, "rom", rom);
        return searchStr;
    }

    addToQueryString = (str, paramName, paramValue) => {
        return paramValue ? str ? `${str}&${paramName}=${paramValue}` :  `${paramName}=${paramValue}` : str;
    }

    handleOptionChange = (options) => {
        this.props.match.params.brand === "Xiaomi" 
            ? this.callURL("/mobiles/Xiaomi", options)
            : this.props.match.params.brand === "Samsung"
            ? this.callURL("/mobiles/Samsung", options)
            : this.props.match.params.brand === "Realme"
            ? this.callURL("/mobiles/Realme", options)
            : this.props.match.params.brand === "Oppo"
            ? this.callURL("/mobiles/Oppo", options)
            : ""
    }

    callURL = (url, options) => {
        let searchStr = this.makeSearchString(options);
        this.props.history.push({
            pathname: url,
            search: searchStr,
        })
    }

    makeAllOptions = (arr) => {
        let json = {}
        json.ram = this.getDifferentValues(arr, "RAM");
        json.rom = this.getDifferentValues(arr, "ROM");
        return json;
    }

    getDifferentValues = (arr, name) => {
        let arr1 = arr.reduce(
            (acc, curr) =>  
            acc.find(val => val === curr[name]) ? acc : [...acc, curr[name]],
            []
        )
        return arr1;        
    }

    render(){
        const { brand } = this.props.match.params;
        const { mobiles } = this.props;

        console.log(this.props.match.params.brand);

        let queryParams = queryString.parse(this.props.location.search);
        console.log(queryParams);

        const mobile = mobiles.filter((m) => m.brand === brand );
        let mobiles1 = queryParams ? this.filterParams(mobile, queryParams) : mobile;

        let allOptions = this.makeAllOptions(mobiles);

        return (
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-3">
                    <LeftOptions options={queryParams} allOptions={allOptions} onOptionChange={this.handleOptionChange}/>
                    </div>
                    <div className="col-9">
                        {mobiles1.map((m) => (
                            <div className="row border">
                                <div className="col-3">{m.name}</div>
                                <div className="col-2">{m.brand}</div>
                                <div className="col-2">{m.RAM}</div>
                                <div className="col-2">{m.ROM}</div>
                                <div className="col-3">{m.price}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Brand;