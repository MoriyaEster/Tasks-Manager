import { body, validationResult } from "express-validator";

export const createTaskValidator = [
    body("title")
        .not().isEmpty().withMessage("Title is required")
        .isLength({ max: 50 }).withMessage("The maximum title length is 50 characters"),

    body("body")
        .not().isEmpty().withMessage("Body is required")
        .isLength({ max: 500 }).withMessage("The maximum body length is 500 characters"),

    body("time")
        .not().isEmpty().withMessage("Time is required"),

    body("lane_id")
        .not().isEmpty().withMessage("Lane ID is required")
        .isInt({ min: 1, max: 4 }).withMessage("Lane ID must be between 1 and 4")
]

export const createUserValidator = [
    body('username')
        .not().isEmpty().withMessage('username is required')
]

export const createUserTaskValidator = [
    body('username')
        .not().isEmpty().withMessage('User name is required'),

    body('taskId')
        .not().isEmpty().withMessage('Task ID is required')
        .isInt().withMessage('Task ID must be an integer')
]

