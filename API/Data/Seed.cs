using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
          // if we dont have any users in our database then return nothing
          if(await context.Users.AnyAsync()) return;
          // read dummy data Json from directory
          var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
          var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

          // insert it into table AppUser one by one
          foreach (var user in users)
          {
            using var hmac = new HMACSHA512();

            user.UserName = user.UserName.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
            user.PasswordSalt = hmac.Key;

            context.Users.Add(user);
          }
            await context.SaveChangesAsync();
        }
    }
}