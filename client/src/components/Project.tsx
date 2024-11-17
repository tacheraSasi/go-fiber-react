import React from 'react'
import { Project as P } from './RecentProjects'

interface projectProps {
  project:P
}

const Project = ({project}:projectProps) => {
  return (
    <li className="flex justify-between items-center">
      <div>
        <p className="text-neutral-300 font-medium">
          {project.title}
        </p>
        <p className="text-neutral-500 text-sm">
          Owner: {project.owner}
        </p>
      </div>
      <p className="text-green-400 font-semibold">{project.createdAt}</p>
    </li>
  )
}

export default Project