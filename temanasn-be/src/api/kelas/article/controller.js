const Joi = require('joi');

const database = require('#database');
const {returnPagination, filterToJson} = require('#utils');
// const { BadRequestError } = require('#errors');

const getByClass = async (req, res, next) => {
    try {
        const schema = Joi.object({
            kelasId: Joi.number().required(),
            skip: Joi.number(),
            take: Joi.number(),
            sortBy: Joi.string(),
            descending: Joi.boolean(),
            filters: Joi.object(),
        });

        const validate = await schema.validateAsync(req.query);

        const result = await database.$transaction([
            database.kelasArticle.findMany({
                skip: validate.skip,
                take: validate.take,
                orderBy: {
                    [validate.sortBy]: validate.descending ? 'desc' : 'asc',
                },
                where: {
                    kelasId: validate.kelasId,
                },
                select: {
                    id: true,
                    userId: true,
                    kelasId: true,
                    title: true,
                    description: true,
                    isApprove: true,
                    createdAt: true,
                    updatedAt: true,
                    media: true,
                    comment: {
                        select: {
                            id: true,
                            userId: true,
                            articleId: true,
                            comment: true,
                            createdAt: true,
                            User: {
                                select: {
                                    id: true,
                                    email: true,
                                    name: true,
                                },
                            },
                        }
                    },
                    like: {
                        where: {
                            userId: req.user.id,
                        },
                        select: {
                            id: true,
                            userId: true,
                            createdAt: true,
                        },
                    },
                    _count: {
                        select: {
                            like: true,
                        },
                    },
                    Kelas: true,
                    User: true,
                },
            }),
            database.kelasArticle.count({
                where: {
                    ...filterToJson(validate),
                },
            }),
        ]);

        return returnPagination(req, res, result);
    } catch (error) {
        next(error);
    }
};

const insert = async (req, res, next) => {
    try {
        const schema = Joi.object({
            media: Joi.array().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            kelasId: Joi.number().required()
        });

        const validate = await schema.validateAsync({
            ...req.body
        });

        const result = await database.kelasArticle.create({
            data: {
                ...validate,
                userId: req.user.id,
                media: {
                    createMany: {
                        data: validate.media.map((media) => ({
                            ...media
                        }))
                    }
                }
            }
        });

        res.status(200).json({
            data: result,
            msg: 'Berhasil membuat article',
        });
    } catch (error) {
        next(error);
    }
};

const updateLike = async (req, res, next) => {
        try {
            const schema = Joi.object({
                id: Joi.allow(null),
                articleId: Joi.number().required()
            });

            const validate = await schema.validateAsync({
                ...req.body
            });

            const result = (req.body.id) ? await database.kelasArticleLike.delete({
                where: {
                    id: req.body.id
                },
            }) : await database.kelasArticleLike.create({
                data: {
                    ...validate,
                    userId: req.user.id
                }
            });

            res.status(200).json({
                data: result,
                msg: 'Berhasil update article like',
            });
        } catch
            (error) {
            next(error);
        }
    }
;

const postComment = async (req, res, next) => {
    try {
        const schema = Joi.object({
            comment: Joi.string().required(),
            articleId: Joi.number().required()
        });

        const validate = await schema.validateAsync({
            ...req.body
        });

        const result = await database.kelasArticleComment.create({
            data: {
                ...validate,
                userId: req.user.id,
            }
        })

        res.status(200).json({
            data: result,
            msg: 'Berhasil kirim komentar',
        });
    } catch
        (error) {
        next(error);
    }
};

module.exports = {
    getByClass,
    insert,
    updateLike,
    postComment
};
