import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import AuthService from "../../services/auth.service";
import { IUserInput } from "../../interfaces/IUser";
import { auth } from "../../_middlewares/auth";
import {
    signinSchema,
    signupSchema,
    updateSchema,
    verifyEmailSchema,
} from "./auth.validators";

const route = Router();
