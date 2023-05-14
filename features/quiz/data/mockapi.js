import { createServer, Model } from "miragejs"


export const MockServer = () => createServer({
    models: {
        // This model maintains the object structure for when it has to receive a post request.
        answer: Model.extend({
            questionId: '',
            slectedAnswer: '',
            elpasedTime: '',
        })
    },
    routes() {
        this.get("/api/questions", () => {
            /*
            A quiz set on music.
            Here is a description of the api:
                The /api/questions endpoint holds the following info:
                questionId, 
                question text, 
                options available for the question, 
                answer for the question, 
                if the image needs to be shown or not,
                and the link for the image.
            */
            return {
                "1": {
                    id: 1,
                    question:
                        "Which artist released the hit single 'Shape of You'?",
                    options: [
                        'Justin Bieber',
                        'Bruno Mars',
                        'Ed Sheeran',
                        'Taylor Swift',
                        'Adele',
                        'Shawn Mendes',
                        'Drake',
                    ],
                    answer: 'Ed Sheeran',
                    showImage: true,
                    imageLink: 'https://thumbs2.imgbox.com/8a/cd/2X3yoZW4_t.jpeg',
                },
                "2": {
                    id: 2,
                    question: "Which band is known for the song 'Hey Jude'?",
                    options: [
                        'Coldplay',
                        'Queen',
                        'Led Zeppelin',
                        'U2',
                        'Nirvana',
                        'The Beatles',
                        'AC/DC',
                    ],
                    answer: 'The Beatles',
                    showImage: true,
                    imageLink:
                        'https://images2.imgbox.com/f5/46/NV2Iqttm_o.jpg',
                },
                "3": {
                    id: 3,
                    question: "Who won the 'Album of the Year' at the 2021 Grammy Awards?",
                    options: [
                        'Dua Lipa',
                        'Taylor Swift',
                        'Beyoncé',
                        'Post Malone',
                        'Billie Eilish',
                        'Harry Styles',
                        'Ariana Grande',
                    ],
                    answer: 'Taylor Swift',
                    showImage: true,
                    imageLink:
                        'https://images2.imgbox.com/55/ad/CO2RquOc_o.jpeg',
                },
                "4": {
                    id: 4,
                    question: "Which artist released the album 'Lemonade'?",
                    options: [
                        'Beyoncé',
                        'Rihanna',
                        'Kendrick Lamar',
                        'Drake',
                        'Adele',
                        'Justin Timberlake',
                        'The Weeknd',
                    ],
                    answer: 'Beyoncé',
                    showImage: true,
                    imageLink:
                        'https://images2.imgbox.com/8c/6f/x1E4AMET_o.jpeg',
                },
                "5": {
                    id: 5,
                    question: 'Who performed the Super Bowl halftime show in 2020?',
                    options: [
                        'Justin Timberlake',
                        'Coldplay',
                        'Beyoncé',
                        'Lady Gaga',
                        'Jennifer Lopez and Shakira',
                        'Katy Perry',
                        'Bruno Mars',
                    ],
                    answer: 'Jennifer Lopez and Shakira',
                    showImage: false,
                    imageLink:
                        'https://images2.imgbox.com/45/7c/9BNK04YZ_o.jpeg',
                },
            }
        })
        this.post("/api/answers", (schema, request) => {
            /*
            This post endpoint /api/answers takes in the object and stores it for scoring later. 
            It also holds the elapsed amount of time for each question answered should that data be required later.
            It however does not hold information for multiple attempts. 
            */
            const attrs = JSON.parse(request.requestBody);
            const answer = schema.answers.create(attrs);
            return answer;
        })
        this.get("/api/answers", (schema) => {
            /*
            This is the get for the answers endpoint to access all the answers for later scoring purposes.
            */
            const answers = schema.db.answers;
            return answers;
        })
        this.delete("/api/answers", (schema) => {
            /*
            Cleans the /api/answers enpoint so that when re-taking the quiz, the old stores do not impact the results at the end.
            */
            schema.db.answers.remove(); // Remove all answers from the database
            return { message: "Answers cleared successfully" };
        });
    },

});