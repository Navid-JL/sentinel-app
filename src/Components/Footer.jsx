import { FaGithub, FaTelegram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer items-center p-4 bg-neutral text-neutral-content justify-center">
      <div className="items-center grid-flow-col">
        <a href="/">
          <FaGithub size={20} />
        </a>
        <a href="/">
          <FaTelegram size={20} />
        </a>
      </div>
    </footer>
  )
}

export default Footer
