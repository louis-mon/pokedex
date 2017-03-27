name := """scala-web-project"""
version := "1.0-SNAPSHOT"
scalaVersion := "2.11.8"

lazy val root = (project in file(".")).enablePlugins(PlayScala)
pipelineStages := Seq(digest)

libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  "com.jsuereth" %% "scala-arm" % "2.0"
)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"
