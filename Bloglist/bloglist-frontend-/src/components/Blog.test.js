import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('render title and author only by default', () => {
    const blog = {
        title: 'jest test for react app',
        author: 'Jest test programmer',
        url: 'www.Jest.testing.library.com',
        likes: 100,
    }
    // render(<Blog blog={blog} />)

    // const element = screen.getByText('jest test for react app')
    // expect(element).toBeDefined()

    const { container } = render(<Blog blog={blog} />)

    // const blog = container.querySelector('.blog')

    const halfBlog = container.querySelector('.halfBlog')
    const fullBlog = container.querySelector('.fullBlog')

    expect(halfBlog).toHaveTextContent('jest test for react app')
    expect(halfBlog).toHaveTextContent('Jest test programmer')

    expect(halfBlog).toHaveTextContent(`${blog.title}`)
    expect(halfBlog).toHaveTextContent(`${blog.author}`)

    expect(fullBlog).not.toBeVisible()

    expect(fullBlog).toHaveStyle('display: none')
})

test('click button to show details of a blog', async () => {
    const blog = {
        title: 'jest test for react app',
        author: 'Jest test programmer',
        url: 'www.Jest.testing.library.com',
        likes: 100,
    }
    const mocktoggleBlogVisible = jest.fn()

    render(<Blog blog={blog} toggleDetailsVisibility={mocktoggleBlogVisible} />)
    const user = userEvent.setup()
    // https://testing-library.com/docs/user-event/intro/
    const buttonView = screen.getByText('view')
    await user.click(buttonView)

    expect(mocktoggleBlogVisible.mock.calls).toHaveLength(1)
})

test.only('the event handler the component received as props is called twice, when the like button is clicked twice', async () => {
    const blog = {
        title: 'test event handler is called twice',
        author: 'Jest tester',
        url: 'when the like button is clicked twice.com',
        likes: 100,
    }
    const mockClickButtonLikeFunc = jest.fn()

    render(<Blog blog={blog} addLikes={mockClickButtonLikeFunc} />)

    const user = userEvent.setup()
    const buttonView = screen.getByText('view')
    const buttonLike = screen.getByText('like')
    await user.click(buttonView)
    await user.click(buttonLike)
    await user.click(buttonLike)

    expect(mockClickButtonLikeFunc.mock.calls).toHaveLength(2)
})
