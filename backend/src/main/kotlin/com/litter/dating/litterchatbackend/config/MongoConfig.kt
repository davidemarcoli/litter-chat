@Configuration
class MongoConfig : AbstractMongoClientConfiguration() {
    @get:Override
    protected val databaseName: String
        protected get() = "test"

    @Override
    fun mongoClient(): MongoClient {
        val connectionString = ConnectionString("mongodb://localhost:8081/test")
        val mongoClientSettings: MongoClientSettings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .build()
        return MongoClients.create(mongoClientSettings)
    }

    @get:Override
    val mappingBasePackages: Collection
        get() = Collections.singleton("com.baeldung")
}