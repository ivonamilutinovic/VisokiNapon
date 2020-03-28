using System;
using Xunit;
using VISOKI_NAPON.Controllers;
using VISOKI_NAPON.Controllers.Resources;
using VISOKI_NAPON.Persistence;
using VISOKI_NAPON.Questions;
using VISOKI_NAPON.Mapping;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace VIsokiNaponTest
{
    public class QuestionTest
    {

        [Fact]
        public void AnswerCheckTest()
        {
            var options = new DbContextOptionsBuilder<VisokiNaponDbContext>()
            .UseInMemoryDatabase(databaseName: "FakeDataBase")
            .Options;
            var context = new VisokiNaponDbContext(options);


            context.Questions.Add(new Question(){ Id = 1, Text = "1", Answer = "1", Category = 1 });
            context.Questions.Add(new Question() { Id = 2, Text = "2", Answer = "1", Category = 1 });
            context.Questions.Add(new Question() { Id = 3, Text = "3", Answer = "1", Category = 1 });
            context.Questions.Add(new Question() { Id = 4, Text = "4", Answer = "1", Category = 1 });
            context.Questions.Add(new Question() { Id = 5, Text = "5", Answer = "1", Category = 1 });
            context.Questions.Add(new Question() { Id = 6, Text = "6", Answer = "1", Category = 2 });
            context.Questions.Add(new Question() { Id = 7, Text = "7", Answer = "1", Category = 2 });
            context.Questions.Add(new Question() { Id = 8, Text = "8", Answer = "1", Category = 2 });
            context.Questions.Add(new Question() { Id = 9, Text = "9", Answer = "1", Category = 2 });
            context.Questions.Add(new Question() { Id = 10, Text = "10", Answer = "1", Category = 2 });
            context.Questions.Add(new Question() { Id = 11, Text = "11", Answer = "1", Category = 3 });
            context.Questions.Add(new Question() { Id = 12, Text = "12", Answer = "1", Category = 3 });
            context.Questions.Add(new Question() { Id = 13, Text = "13", Answer = "1", Category = 3 });
            context.Questions.Add(new Question() { Id = 14, Text = "14", Answer = "1", Category = 3 });
            context.Questions.Add(new Question() { Id = 15, Text = "15", Answer = "1", Category = 3 });
            context.Questions.Add(new Question() { Id = 16, Text = "16", Answer = "1", Category = 4 });
            context.Questions.Add(new Question() { Id = 17, Text = "17", Answer = "1", Category = 1 });
            context.Questions.Add(new Question() { Id = 18, Text = "18", Answer = "1", Category = 1 });
            context.Questions.Add(new Question() { Id = 19, Text = "19", Answer = "1", Category = 2 });
            context.Questions.Add(new Question() { Id = 20, Text = "20", Answer = "1", Category = 2 });
            context.Questions.Add(new Question() { Id = 21, Text = "21", Answer = "1", Category = 3 });
            context.Questions.Add(new Question() { Id = 22, Text = "22", Answer = "1", Category = 3 });
            context.SaveChanges();

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });
            var mapper = mockMapper.CreateMapper();

            var controller = new QuestionsController(context, mapper);

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            // CHECK TRUE ANSWER 
            var a = new QuestionsController.obj();
            a.tex = "1";
            a.ans = "1";
            var result = controller.TestName(a);
            string requestJson = JsonConvert.SerializeObject(result.Result);
            Assert.True(requestJson.Contains("true") == true);


            // CHECK FALSE ANSWER 
            var b = new QuestionsController.obj();
            b.tex = "2";
            b.ans = "22";
            var result1 = controller.TestName(b);
            requestJson = JsonConvert.SerializeObject(result1.Result);
            Assert.True(requestJson.Contains("false") == true);


        }

    }

}
