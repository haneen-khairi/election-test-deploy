import React from 'react'

export default function Profile({
    img,
    title,
    description
}: {
    img: string,
    title: string,
    description: string
}) {
  return <div className="profile">
    <img src={img} />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
}
