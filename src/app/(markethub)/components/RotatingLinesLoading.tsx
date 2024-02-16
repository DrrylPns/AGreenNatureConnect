import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

function RotatingLinesLoading() {
  return (
    <div className="text-center flex justify-center mt-20">
        <RotatingLines
            strokeColor="green"
            strokeWidth="5"
            animationDuration="2"
            width="50"
            visible={true}
        />
    </div>
  )
}

export default RotatingLinesLoading