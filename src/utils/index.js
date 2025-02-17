export const pages = {
  home: '',
  blog: 'Blog',
  about: 'About',
  portfolio: 'Portfolio',
  contact: 'Contact'
}

export const getLinkEditPost = absolutePath => {
  const res = /([^/]+)$/g.exec(absolutePath)
  if (res.length >= 1) {
    return `https://github.com/pierreleguen/leguen.fr/edit/master/src/pages/posts/${res[res.length - 1]}`
  }
  return ''
}
