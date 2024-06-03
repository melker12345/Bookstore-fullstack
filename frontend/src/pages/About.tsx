import React from 'react';

const About: React.FC = () => {
  return (
    <main className="flex flex-col items-center h-full justify-center px-4 py-12 md:px-6 lg:px-8">
      <div className="max-w-3xl space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          About Us
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati
          neque qui laudantium sint voluptatem. Tenetur error soluta ea cumque
          nulla accusantium accusamus dolor saepe modi voluptates debitis
          recusandae quasi temporibus quibusdam vel optio sint, repellat
          deserunt suscipit. Ullam atque hic nisi sed rem aut beatae, magni unde
          in, pariatur ipsum!
        </p>
        <img
          alt="Team Photo"
          className="mx-auto rounded-full"
          height={200}
          src="./images/placeholder.png"
          style={{
            aspectRatio: '200/200',
            objectFit: 'cover',
          }}
          width={200}
        />
      </div>
    </main>
  );
};

export default About;
