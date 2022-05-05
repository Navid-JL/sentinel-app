import { Link } from 'react-router-dom'

const NewsArticle = () => {
  return (
    <div id="article" className="text-center md:col-span-2 flex flex-col justify-evenly p-4">
      <h2 className="text-4xl p-2">Lorem, ipsum</h2>
      <p className="p-2 text-3x1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non a assumenda modi dicta
        exercitationem, officia asperiores recusandae perspiciatis voluptatum incidunt!
      </p>
      <Link className="btn btn-primary w-full" to="/">
        Read More
      </Link>
    </div>
  )
}

export default NewsArticle
