import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import AuthService from "../../services/auth.service";
import { IUserInput } from "../../interfaces/IUser";
import {} from "../../_middlewares/auth";

const route = Router();
