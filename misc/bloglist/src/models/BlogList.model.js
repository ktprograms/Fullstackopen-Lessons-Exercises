export const Model = class extends EventTarget {
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
    #all(blogs) {
        this.dispatchEvent(
            new CustomEvent(
                'all',
                {
                    detail: blogs,
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
    #like(id, likes) {
        this.dispatchEvent(
            new CustomEvent(
                'like',
                {
                    detail: { id, likes },
                }
            )
        );
    }
    #remove(id) {
        this.dispatchEvent(
            new CustomEvent(
                'remove',
                {
                    detail: { id },
                }
            )
        );
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
    all() {
        this.#all(this.blogs);
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
    like(id) { // "Atomic" update
        let newLikes;
        this.blogs = this.blogs.map(function (blog) {
            if (blog.id === id) {
                newLikes = blog.likes + 1;
                return {
                    ...blog,
                    likes: newLikes,
                };
            } else {
                return blog;
            }
        });
        if (newLikes) {
            this.#like(id, newLikes);
        }
    }
    remove(id) {
        this.blogs = this.blogs.filter(function (blog) {
            return blog.id !== id;
        });
        this.#remove(id);
    }
};
