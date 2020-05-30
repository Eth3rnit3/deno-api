FROM hayd/alpine-deno:1.0.2
EXPOSE 8080
WORKDIR /app
USER deno
COPY deps.ts .
RUN deno cache deps.ts
ADD . .
RUN deno cache server.ts
CMD ["run", "--allow-net", "--allow-env", "--allow-write", "--allow-read", "--allow-plugin", "--unstable", "server.ts", "-L=debug"]