import { Body, Controller, Get, HttpCode, HttpStatus, Post, Render, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { request, Response } from 'express';
import { LoginGuard } from './auth.local-auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Get('login')
    @Render('auth/login')
    async loginForm() {
    
    }
    @UseGuards(LoginGuard)  
    @Post('login')
    login(@Res() res: Response) {
        return 'hola'
        //res.redirect('/home');
    }
    @UseGuards(AuthenticatedGuard)
    @Get('home')
    @Render('home')
    getHome(@Request() req) {
        return { user: req.user };
    }
    

    @Get('logout')
    logout(@Request() req, @Res() res: Response) {
        req.logout();
        res.redirect('/');
    }
}
