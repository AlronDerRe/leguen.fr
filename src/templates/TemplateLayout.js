import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import ReactDisqusComments from 'react-disqus-comments'
import AuthorPostFooter from '../components/AuthorPostFooter'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Share from '../components/Share'
import { pages } from '../utils'

class Template extends React.Component {
  state = {
    location: '',
    show_share: false
  }

  componentDidMount() {
    this.setState({ location: window.location.href })
    let body = document.documentElement
    const element = document.getElementById('Post_content')
    if (!element) return
    let contentY = element.offsetTop
    let height = element.clientHeight

    const scrollListenerShare = () => {
      let y = body.scrollTop - contentY + 110
      let show = y >= 0 && y - 0 <= height - 340

      if (this.state.show_share !== show) {
        this.setState({ show_share: show })
      }
    }

    window.addEventListener('scroll', scrollListenerShare)
  }

  render() {
    const { isPost, title, image, description, path } = this.props
    const { siteUrl, disqusShortname } = this.props.data.site.siteMetadata
    return (
      <Layout location={this.props.location} active={isPost ? pages.blog : pages.portfolio}>
        <SEO
          title={title}
          image={`${siteUrl}${image}`}
          url={`${siteUrl}/${path}`}
          description={description}
          isPost={isPost}
        />
        {this.props.children}
        <div className="Foot__Share">
          <Share title={title} url={`${siteUrl}/${path}`} />
        </div>
        <AuthorPostFooter avatar={this.props.data.avatar} make={!isPost} />
        <div className="Post__footer">
          <div id="disquser" className="container Disqus">
            <ReactDisqusComments
              shortname={disqusShortname}
              identifier={path}
              title={title}
              url={this.state.location}
            />
          </div>
          {isPost && <Share fixed show={this.state.show_share} title={title} url={`${siteUrl}/${path}`} />}
        </div>
      </Layout>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        avatar: imageSharp(fluid: { originalName: { regex: "/avatar.jpg/" } }) {
          sizes(maxWidth: 180) {
            ...GatsbyImageSharpSizes_tracedSVG
          }
        }
        site {
          siteMetadata {
            siteUrl
            disqusShortname
          }
        }
      }
    `}
    render={data => <Template data={data} {...props} />}
  />
)
