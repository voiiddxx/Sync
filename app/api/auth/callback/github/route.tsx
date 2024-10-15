import axios from "axios";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest){
   try {
    const code = req.nextUrl.searchParams.get('code');

    if(!code){
        throw new Error('No code provided');
        return;
    }

    // exchanging github token for access token
    const jsonDataBody= {
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL
    }
    const response = await axios.post('https://github.com/login/oauth/access_token' , jsonDataBody , {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
    });

    const {access_token} = await response.data;


    if(!access_token){
        throw new Error('No access token provided');
        return;
    }


    // fetching user github data 
    const userRes = await fetch('https://api.github.com/user' , {
        headers:{
            Authorization: `Bearer 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`,
        }
    });

    const data = await userRes.json();


    if(!data){
        throw new Error('Some Error occured internally Please wait for a while');
        return;
    }
    

    // store the user impo infromation in db using prisma

    return NextResponse.redirect('http:localhost:3000')
   } catch (error) {
    console.log('Error: ' , error);
    throw new Error('Internal Server Error');
   }
}



// response format



//   {
//     login: '',
//     id: ,
//     node_id: '',
//     avatar_url: '',
//     gravatar_id: '',
//     url: '',
//     html_url: '',
//     followers_url: 'httpss',
//     following_url: 'https://api.github.com/r}',
//     gists_url: 'https://api._id}',
//     starred_url: 'htepo}',
//     subscriptions_url: 'https://api.',
//     organizations_url: 'https://api.github.com/users/voiiddxx/orgs',
//     repos_url: 'https://api.github.com/,dmfkdsmgekjgioerjhtreds',
//     events_url: 'https://api.github.com/users/privacy}',
//     received_events_url: 'https://api.github.c',
//     type: 'User',
//     site_admin: false,
//     name: '',
//     company: null,
//     blog: 'https:.app/',
//     location: '',
//     email: null,
//     hireable: null,
//     bio: ' Products🔥 \r\n',
//     twitter_username: null,
//     notification_email: null,
//     public_repos: 49,
//     public_gists: 0,
//     followers: 30,
//     following: 26,
//     created_at: '2021-12-09T12:00:11Z',
//     updated_at: '2024-07-27T15:45:02Z',
//     private_gists: 0,
//     total_private_repos: 18,
//     owned_private_repos: 18,
//     disk_usage: 194348,
//     collaborators: 1,
//     two_factor_authentication: false,
//     plan: {
//       name: 'free',
//       space: 976562499,
//       collaborators: 0,
//       private_repos: 10000
//     }
//   }