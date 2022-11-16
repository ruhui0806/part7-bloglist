import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('test for the new blog form: the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const mockHandleSubmitFunc = jest.fn()
    const mockHandleNotifiFunc = jest.fn()
    const user = userEvent.setup()

    render(
        <BlogForm
            handleSubmit={mockHandleSubmitFunc}
            handleNotification={mockHandleNotifiFunc}
        />
    )

    const inputUrl = screen.getByTestId('url')
    const inputTitle = screen.getByTestId('title')
    const inputAuthor = screen.getByTestId('author')

    const buttonSubmit = screen.getByText('Create new blog')

    await user.type(inputUrl, 'testing new blog form')
    await user.type(inputAuthor, 'testing new blog form-author')
    await user.type(inputTitle, 'testing new blog form-author-title')

    await user.click(buttonSubmit)

    console.log(mockHandleSubmitFunc.mock.calls[0][0])
    // the first argument of the first call to the mockHandleSubmitFunc is the object below:
    // {
    //     title: 'testing new blog form-author-title',
    //     author: 'testing new blog form-author',
    //     url: 'testing new blog form',
    //     likes: 108
    //   }
    expect(mockHandleSubmitFunc.mock.calls).toHaveLength(1)
    expect(mockHandleSubmitFunc.mock.calls[0][0]).toBeDefined()
    expect(mockHandleSubmitFunc.mock.calls[0][0].title).toBeDefined()
    expect(mockHandleSubmitFunc.mock.calls[0][0].title).toBe(
        'testing new blog form-author-title'
    )
    expect(mockHandleSubmitFunc.mock.calls[0][0].author).toBe(
        'testing new blog form-author'
    )
})
