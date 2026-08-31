# img/ — images folder

Site images live here. Sub-folders:

- `blog/` — images uploaded via the blog editor (`editor.html`). The editor
  saves uploaded images into `img/blog/` and references them as
  `img/blog/<filename>`.

Uploaded images are referenced with site-root-relative paths, e.g.
`<img src="img/blog/my-photo.jpg" />`.
