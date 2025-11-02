import React from 'react'

const isAdmin = (user) => {
    if (user === 'Admin') {
        return true
    }
    return false
}

export default isAdmin