const Joi = require('joi');

const database = require('#database');
const {returnPagination, filterToJson} = require('#utils');
const {BadRequestError} = require('#errors');
// const { BadRequestError } = require('#errors');

const get = async (req, res, next) => {
    try {
        const schema = Joi.object({
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
                    ...filterToJson(validate),
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
                    _count: {
                        select: {
                            like: true,
                            comment: true,
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
const update = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.number().required(),
        });

        const validate = await schema.validateAsync({
            ...req.body,
        });

        const find = await database.kelasArticle.findUnique({
            where: {
                id: validate.id,
            },
        });

        if (!find) {
            throw new BadRequestError('Article tidak ditemukan');
        }

        await database.kelasArticle.update({
            where: {
                id: validate.id,
            },
            data: {
                isApprove: !find.isApprove,
            },
        });

        res.status(200).json({
            data: find,
            msg: 'Berhasil mengubah article.',
        });
    } catch (error) {
        next(error);
    }
};
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
                    isApprove: true,
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
                                    gambar: true,
                                },
                            },
                        },
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
                    isApprove: true,
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
        const {title, description, kelasId} = req.body;
        const media = [];
        // Process media files from req.files
        req.files.forEach((file, index) => {
            const fileType = req.body.media[index].type;
            media.push({
                urlFile: file.path,
                type: fileType
            });
        });

        const schema = Joi.object({
            media: Joi.array().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            kelasId: Joi.number().required(),
        });

        const validate = await schema.validateAsync({
            title,
            description,
            media,
            kelasId
        });

        const result = await database.kelasArticle.create({
            data: {
                ...validate,
                userId: req.user.id,
                media: {
                    createMany: {
                        data: validate.media
                            .filter((e) => e.urlFile && e.type)
                            .map((data) => ({
                                ...data,
                            })),
                    },
                },
            },
        });

        res.status(200).json({
            data: result,
            msg: 'Berhasil membuat article, menunggu verifikasi admin',
        });
    } catch (error) {
        next(error);
    }
};

const updateLike = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.allow(null),
            articleId: Joi.number().required(),
        });

        const validate = await schema.validateAsync({
            ...req.body,
        });

        const result = req.body.id
            ? await database.kelasArticleLike.delete({
                where: {
                    id: req.body.id,
                },
            })
            : await database.kelasArticleLike.create({
                data: {
                    ...validate,
                    userId: req.user.id,
                },
            });

        res.status(200).json({
            data: result,
            msg: req.body.id ? 'Berhasil unlike artikel' : 'Berhasil like artikel',
        });
    } catch (error) {
        next(error);
    }
};
const postComment = async (req, res, next) => {
    try {
        const schema = Joi.object({
            comment: Joi.string().required(),
            articleId: Joi.number().required(),
        });

        const validate = await schema.validateAsync({
            ...req.body,
        });

        const result = await database.kelasArticleComment.create({
            data: {
                ...validate,
                userId: req.user.id,
            },
        });

        res.status(200).json({
            data: result,
            msg: 'Berhasil kirim komentar',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getByClass,
    insert,
    get,
    update,
    updateLike,
    postComment,
};
