import React from 'react'

export default function TextValidators(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
            if (!value || value.length === 0)
                return name + "Field is Mendatory"
            else if (value.length < 2 || value.length > 100)
                return name + "Field Length Must Be 3-100 Characters"
            else
                return ""


            case "basePrice":
            if (!value || value.length === 0)
                return name + "Field is Mendatory"
            else if (parseInt(value)<1)
                return "Price Must be 1 or More Than 1"
            else
                return ""


             case "discount":
            if (!value || value.length === 0)
                return name + "Field is Mendatory"
            else if (parseInt(value)<0 || parseInt(value)>100)
                return "Discount  Must be 0 to 100"
            else
                return ""

             case "stockQuantity":
            if (!value || value.length === 0)
                return name + "Field is Mendatory"
            else if (parseInt(value)<0)
                return "StockQuantity must be More Than 0"
            else
                return ""


        case "description":
            if (!value || value.length === 0)
                return name + "Field Is Mandatory"
            else if (value.length < 50)
                return name + "field length Must be 50 characters or more"
            else
                return ""

        default:
            return ""

    }
}
