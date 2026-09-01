-- CreateTable
CREATE TABLE "LabRun" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "labId" TEXT NOT NULL,
    "containerName" TEXT NOT NULL,
    "containerId" TEXT,
    "port" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'running',
    "errorMessage" TEXT,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stoppedAt" DATETIME
);
