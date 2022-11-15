const BlogsList = () => (
    <>
        <Notification message={message} style={style} />

        <button onClick={handleLogout}>log out</button>
        <br />
        <div style={{ display: blogVisible ? 'none' : '' }}>
            <button onClick={() => setBlogVisible(true)}>new blog</button>
        </div>

        <div style={{ display: blogVisible ? '' : 'none' }}>
            <h3>create new</h3>
            <BlogForm
                handleSubmit={addBlog}
                handleNotification={addBlogNotification}
            />
            <button onClick={() => setBlogVisible(false)}>Cancel</button>
        </div>

        {[...blogs].sort(SortBlogbyLikes).map((blog) => (
            <Blog
                key={blog.id}
                blog={blog}
                addLikes={() => updateLikes(blog.id)}
                removeBlog={() => removeBlogof(blog.id)}
            />
        ))}
    </>
)
