import React from 'react'

export default function TextValidators(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
            if (!value || value.length === 0)
                return name + "Field is Mendatory"
            else if (value.length < 3 || value.length > 100)
                return name + "Field Length Must Be 3-100 Characters"
            else
                return ""
        default:
            return ""

    }
}
