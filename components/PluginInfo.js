import Gravatar from 'react-gravatar'
import Link from 'next/link'
import InstallModal from './InstallModal'
import GithubIcon from '../static/github-icon.svg'
import * as gtag from '../lib/gtag'

export default class extends React.Component {
  constructor() {
    super()

    this.state = {
      isModalOpen: false
    }

    this.openInstallModal = this.openInstallModal.bind(this)
    this.closeInstallModal = this.closeInstallModal.bind(this)
  }

  openInstallModal() {
    gtag.event({
      action: 'Opened install modal',
      category: 'plugin',
      label: 'open_install_modal',
      value: this.props.plugin.meta.name
    })

    this.setState({
      isModalOpen: true
    })
  }

  closeInstallModal() {
    this.setState({
      isModalOpen: false
    })
  }

  render() {
    const { plugin } = this.props

    return (
      <React.Fragment>
        <InstallModal
          name={plugin.meta.name}
          isOpen={this.state.isModalOpen}
          closeModal={this.closeInstallModal}
        />

        <div className="plugin-info">
          <div className="plugin-info__author border-followed">
            <Gravatar
              className="plugin-info__avatar"
              email={plugin.collected.metadata.publisher.email}
            />
            <span>{plugin.collected.metadata.publisher.username}</span>
          </div>

          <span className="plugin-info__downloads border-followed">
            {plugin.collected.npm.downloads[2].count.toLocaleString()} downloads
            in the last month
          </span>

          {plugin.collected.metadata.links.repository && (
            <a
              className="plugin-info__github-link"
              target="_blank"
              href={plugin.collected.metadata.links.repository}
            >
              <GithubIcon />
            </a>
          )}

          <Link
            href={`/source?id=${plugin.collected.metadata.name}`}
            as={`/plugins/${plugin.collected.metadata.name}/source`}
          >
            <a className="plugin-info__link">View source code</a>
          </Link>

          <div className="plugin-info__version">
            Version {plugin.collected.metadata.version}
          </div>

          <a className="plugin-info__install" onClick={this.openInstallModal}>
            Install
          </a>

          <style jsx>{`
            .plugin-info {
              position: fixed;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              max-width: 980px;
              width: 100%;
              background: black;
              height: 6.4rem;
              display: flex;
              align-items: center;
              font-size: 1.2rem;
              padding: 0 40px;
            }

            .plugin-info__author {
              display: flex;
              align-items: center;
            }

            :global(.plugin-info__avatar) {
              border-radius: 50%;
              width: 28px;
              height: 28px;
              margin-right: 8px;
            }

            .plugin-info__version {
              margin-left: auto;
            }

            .plugin-info__link {
              text-transform: uppercase;
              font-size: 1rem;
            }

            .plugin-info__install {
              cursor: pointer;
              border-radius: 2px;
              background: white;
              color: black;
              padding: 0 16px;
              margin-left: 16px;
              opacity: 1;
              transition: opacity 0.2s ease;
            }

            .plugin-info__install:hover {
              opacity: 0.9;
            }

            .border-followed {
              margin-right: 8px;
              padding-right: 8px;
              border-right: 1px solid #333333;
            }

            .plugin-info__github-link {
              display: flex;
              margin-right: 24px;
            }

            .plugin-info__github-link:hover :global(svg) {
              fill: white;
            }

            @media (max-width: 716px) {
              .plugin-info {
                position: relative;
                transform: translateX(0);
                left: auto;
                flex-direction: column;
                align-items: center;
                height: auto;
                padding-bottom: 64px;
              }

              .plugin-info__author {
                margin-bottom: 24px;
                flex: 1 0 auto;
                order: 1;
              }

              .plugin-info__downloads {
                order: 2;
              }

              .plugin-info__github-link {
                margin-right: 0;
                margin-top: 16px;
                flex: 1 0 auto;
                order: 5;
              }

              .plugin-info__github-link :global(svg) {
                height: 24px;
                width: 24px;
                fill: white;
              }

              .plugin-info__link {
                margin: 16px 0 28px;
                order: 6;
                font-weight: 600;
              }

              .plugin-info__version {
                margin-left: 0;
                margin-bottom: 16px;
                order: 4;
              }

              .border-followed {
                margin-right: 0;
                padding-right: 0;
                border-right: none;
                margin-bottom: 16px;
              }

              .plugin-info__install {
                margin-left: 0;
                margin-bottom: 16px;
                padding: 8px 28px;
                order: 3;
              }
            }
          `}</style>
        </div>
      </React.Fragment>
    )
  }
}
