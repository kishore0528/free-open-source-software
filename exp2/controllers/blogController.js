let inMemoryBlogs = []; // In-memory blog list
let nextBlogId = 1;

exports.createBlog = (req, res) => {
  const { title, content } = req.body;
  const newBlog = { id: nextBlogId++, title, content, author: req.user.username };
  inMemoryBlogs.push(newBlog);
  res.status(201).json(newBlog);
};

exports.getAllBlogs = (req, res) => {
  res.json(inMemoryBlogs);
};

exports.getBlogById = (req, res) => {
  const blog = inMemoryBlogs.find(blog => blog.id == req.params.id);
  if (!blog) return res.status(404).json({ error: 'Blog not found' });
  res.json(blog);
};

exports.updateBlog = (req, res) => {
  const blog = inMemoryBlogs.find(blog => blog.id == req.params.id);
  if (!blog) return res.status(404).json({ error: 'Blog not found' });

  if (blog.author !== req.user.username)
    return res.status(403).json({ error: 'Unauthorized' });

  blog.title = req.body.title || blog.title;
  blog.content = req.body.content || blog.content;
  res.json(blog);
};

exports.deleteBlog = (req, res) => {
  const blogIndex = inMemoryBlogs.findIndex(blog => blog.id == req.params.id);
  if (blogIndex === -1) return res.status(404).json({ error: 'Blog not found' });

  if (inMemoryBlogs[blogIndex].author !== req.user.username)
    return res.status(403).json({ error: 'Unauthorized' });

  inMemoryBlogs.splice(blogIndex, 1);
  res.json({ message: 'Blog deleted' });
};