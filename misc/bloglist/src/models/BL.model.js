export const Model = {
    blogs: [
        {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
            id: '0',
        },
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            id: '1',
        },
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            id: '2',
        },
        {
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
            likes: 10,
            id: '3',
        },
        {
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            likes: 0,
            id: '4',
        },
    ],

    create(blog, handler) {
        const id = String(
            Math.max(
                ...(
                    this.blogs.map(function (blog) {
                        return blog.id;
                    })
                )
            ) + 1
        );
        const newBlog = { ...blog, id };
        Model.blogs.push(newBlog);
        handler(newBlog);
    },
    getAll(handler) {
        handler(Model.blogs);
    },
};
