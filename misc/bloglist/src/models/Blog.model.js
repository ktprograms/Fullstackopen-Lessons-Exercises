export const BlogModel = class extends EventTarget {
    constructor() {
        super();
        this.blogs = [
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
        ];
    }

    // Event dispatchers
    #create(blog) {
        this.dispatchEvent(
            new CustomEvent(
                'create',
                {
                    detail: blog,
                }
            )
        );
    }
    #setComment(id, comment) {
        this.dispatchEvent(
            new CustomEvent(
                'setComment',
                {
                    detail: { id, comment },
                }
            )
        );
    }

    // Getters
    all() {
        return this.blogs;
    }

    // Backend operations (CRUD)
    create(blog) {
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
        this.blogs.push(newBlog);
        this.#create(newBlog);
    }
    setComment(id, comment) { // Partial update
        this.blogs = this.blogs.map(function (blog) {
            if (blog.id === id) {
                return {
                    ...blog,
                    comment: comment,
                };
            } else {
                return blog;
            }
        });
        this.#setComment(id, comment);
    }
};
